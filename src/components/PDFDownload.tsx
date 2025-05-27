import { FileDown } from 'lucide-react';

interface PDFDownloadProps {
  title: string;
  url: string;
}

export default function PDFDownload({ title, url }: PDFDownloadProps) {
  return (
    <a
      href={url}
      download
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
    >
      <FileDown size={20} />
      <span>Download {title}</span>
    </a>
  );
} 