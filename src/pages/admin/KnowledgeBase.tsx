import React, { useState, useEffect } from 'react'; // <--- Add useEffect
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import FileUploader from '../../components/admin/FileUploader';
import KnowledgeBaseTable from '../../components/admin/KnowledgeBaseTable';
import apiClient from '../../services/api'; // <--- IMPORT THE API CLIENT
import { toast } from "@/hooks/use-toast" // <--- Import toast for feedback

export interface KnowledgeItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'youtube';
  status: 'indexed' | 'processing' | 'error';
  dateAdded: string;
  size?: string;
}

const KnowledgeBase: React.FC = () => {
  // We start with an empty array now, as we will fetch data from the backend
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- START OF MODIFIED CODE ---

  // Fetch knowledge items from the backend
  const fetchKnowledgeItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/v1/data/sources');
      if (response.data && response.data.sources) {
        setKnowledgeItems(response.data.sources);
      }
    } catch (error) {
      console.error('Failed to fetch knowledge items:', error);
      setError('Failed to load knowledge sources. Please check if the backend is running.');
      toast({ title: "Error", description: "Failed to load knowledge sources." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const handleUpload = async (files: File[], youtubeUrl?: string) => {
    const formData = new FormData();
    
    // Add all files to the form data
    files.forEach(file => {
      formData.append('files', file);
    });

    // Add the YouTube URL if it exists
    if (youtubeUrl) {
      formData.append('youtube_url', youtubeUrl);
    }
    
    // Check if there is anything to upload
    if (files.length === 0 && !youtubeUrl) {
        toast({ title: "Warning", description: "No files or URL to upload." });
        return;
    }

    toast({ title: "Uploading", description: "Uploading and indexing... This may take a moment." });

    try {
      const response = await apiClient.post('/api/v1/data/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast({ title: "Success", description: "Knowledge base updated successfully!" });
        // Re-fetch the list of knowledge items to update the table
        await fetchKnowledgeItems();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast({ title: "Error", description: "Upload failed. Please check the server logs." });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(`/api/v1/data/sources/${id}`);
      if (response.status === 200) {
        toast({ title: "Success", description: "Source deleted successfully." });
        // Re-fetch the list to update the table
        await fetchKnowledgeItems();
      }
    } catch (error) {
      console.error('Failed to delete source:', error);
      toast({ title: "Error", description: "Failed to delete source. Please try again." });
    }
  };

  // --- END OF MODIFIED CODE ---
  
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Upload and manage documents and videos for your AI assistant
        </p>
      </div>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Add Knowledge Sources</CardTitle>
          <CardDescription>
            Upload PDF/DOCX files or add YouTube videos to expand your AI's knowledge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploader onUpload={handleUpload} />
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="text-foreground">Knowledge Sources</CardTitle>
          <CardDescription>
            Manage your uploaded documents and videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <p className="text-muted-foreground">Loading knowledge sources...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-destructive/10">
                  <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Error loading sources</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button 
                onClick={fetchKnowledgeItems}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : (
            <KnowledgeBaseTable items={knowledgeItems} onDelete={handleDelete} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;