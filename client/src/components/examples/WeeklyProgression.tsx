import WeeklyProgression from '../WeeklyProgression';

export default function WeeklyProgressionExample() {
  const sampleHistory = [
    { week: 'Sept 23', stage: 'LOI' as const },
    { week: 'Sept 16', stage: 'Site Approved' as const },
    { week: 'Sept 9', stage: 'Active Discussions' as const },
    { week: 'Sept 2', stage: 'Prospecting' as const },
  ];

  const executedHistory = [
    { week: 'Sept 23', stage: 'Executed' as const },
    { week: 'Sept 16', stage: 'In Legal' as const },
    { week: 'Sept 9', stage: 'IC Approved' as const },
    { week: 'Sept 2', stage: 'LOI' as const },
  ];

  return (
    <div className="p-6 space-y-8">
      <h3 className="text-lg font-semibold text-foreground">Weekly Progression History</h3>
      
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Active Deal Progression</h4>
          <WeeklyProgression weeklyHistory={sampleHistory} />
        </div>
        
        <div className="border border-border rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Completed Deal Progression</h4>
          <WeeklyProgression weeklyHistory={executedHistory} />
        </div>
      </div>
    </div>
  );
}