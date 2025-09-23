import WeeklyProgression from '../WeeklyProgression';

export default function WeeklyProgressionExample() {
  const sampleHistory = [
    { week: '9/22/25', stage: 'LOI' as const },
    { week: '9/15/25', stage: 'Site Approved' as const },
    { week: '9/8/25', stage: 'Active Discussions' as const },
    { week: '9/1/25', stage: 'Prospecting' as const },
  ];

  const executedHistory = [
    { week: '9/22/25', stage: 'Executed' as const },
    { week: '9/15/25', stage: 'In Legal' as const },
    { week: '9/8/25', stage: 'IC Approved' as const },
    { week: '9/1/25', stage: 'LOI' as const },
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