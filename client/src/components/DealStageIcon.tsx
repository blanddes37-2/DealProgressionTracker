import { DealStage, STAGE_COLORS } from '@/types/deal';
import { 
  Search, 
  MessageCircle, 
  CheckCircle, 
  FileText, 
  Users, 
  Scale, 
  CheckCircle2, 
  Pause, 
  X, 
  ArrowLeft 
} from 'lucide-react';

interface DealStageIconProps {
  stage: DealStage;
  className?: string;
  showTooltip?: boolean;
}

const STAGE_ICONS: Record<DealStage, any> = {
  'Prospecting': Search,
  'Active Discussions': MessageCircle,
  'Site Approved': CheckCircle,
  'LOI': FileText,
  'IC Approved': Users,
  'In Legal': Scale,
  'Executed': CheckCircle2,
  'On Hold': Pause,
  'Dead': X,
  'Withdrawn': ArrowLeft,
};

export default function DealStageIcon({ stage, className = 'h-4 w-4', showTooltip = false }: DealStageIconProps) {
  const IconComponent = STAGE_ICONS[stage];
  const color = STAGE_COLORS[stage];
  
  return (
    <div className={`inline-flex items-center justify-center rounded-full ${className}`} 
         style={{ backgroundColor: color }}
         title={showTooltip ? stage : undefined}>
      <IconComponent className="h-3 w-3 text-white" />
    </div>
  );
}