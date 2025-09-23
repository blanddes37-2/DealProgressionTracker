import ProgressBar from '../ProgressBar';

export default function ProgressBarExample() {
  return (
    <div className="p-6 space-y-8">
      <h3 className="text-lg font-semibold text-foreground">Deal Progress Bars</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Early Stage Deal</h4>
          <ProgressBar currentStage="Active Discussions" />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Mid-Stage Deal</h4>
          <ProgressBar currentStage="LOI" />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Completed Deal</h4>
          <ProgressBar currentStage="Executed" />
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Paused Deal</h4>
          <ProgressBar currentStage="On Hold" />
        </div>
      </div>
    </div>
  );
}