import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DealStage, DealType, DealBrand, DEAL_STAGES } from '@/types/deal';
import { X } from 'lucide-react';

const dealFormSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().default("USA"),
  broker: z.string().min(1, "Broker is required"),
  bdd: z.string().min(1, "BDD is required"),
  dealNumber: z.number().min(1, "Deal number must be at least 1"),
  status: z.enum(DEAL_STAGES as [DealStage, ...DealStage[]]),
  brand: z.enum(['Sike', 'Mytherous']),
  ncoExisting: z.enum(['NCO', 'Existing', 'Takeover']),
  dealType: z.enum(['Direct', 'Sublease', 'Coworking']),
  notes: z.string().default(""),
  rsf: z.string().default(""),
  owner: z.string().min(1, "Owner is required"),
  weeklyHistory: z.array(z.object({
    week: z.string(),
    stage: z.enum(DEAL_STAGES as [DealStage, ...DealStage[]])
  })).default([])
});

type DealFormData = z.infer<typeof dealFormSchema>;

interface DealFormProps {
  initialData?: Partial<DealFormData>;
  onSubmit: (data: DealFormData) => Promise<void>;
  onCancel: () => void;
  title: string;
  submitLabel: string;
  isLoading?: boolean;
}

export default function DealForm({ initialData, onSubmit, onCancel, title, submitLabel, isLoading = false }: DealFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      country: initialData?.country || 'USA',
      broker: initialData?.broker || '',
      bdd: initialData?.bdd || '',
      dealNumber: initialData?.dealNumber || 1,
      status: initialData?.status || 'Prospecting',
      brand: initialData?.brand || 'Sike',
      ncoExisting: initialData?.ncoExisting || 'NCO',
      dealType: initialData?.dealType || 'Direct',
      notes: initialData?.notes || '',
      rsf: initialData?.rsf || '',
      owner: initialData?.owner || '',
      weeklyHistory: initialData?.weeklyHistory || []
    }
  });

  const handleSubmit = async (data: DealFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWeeklyHistory = (currentStatus: DealStage) => {
    const stages: DealStage[] = ['Prospecting', 'Active Discussions', 'Site Approved', 'LOI', 'IC Approved', 'In Legal', 'Executed'];
    const currentIndex = stages.indexOf(currentStatus);
    
    if (currentIndex === -1) {
      // For statuses like 'On Hold', 'Dead', 'Withdrawn', create a simple history
      return [
        { week: '9/22/25', stage: currentStatus },
        { week: '9/15/25', stage: 'Active Discussions' as DealStage },
        { week: '9/8/25', stage: 'Prospecting' as DealStage },
        { week: '9/1/25', stage: 'Prospecting' as DealStage }
      ];
    }
    
    // Create a progression showing how the deal advanced through stages
    const history: { week: string; stage: DealStage }[] = [];
    const baseDate = new Date('2025-09-22');
    
    for (let i = 0; i < 4; i++) {
      const weekDate = new Date(baseDate);
      weekDate.setDate(baseDate.getDate() - (i * 7));
      const month = weekDate.getMonth() + 1;
      const day = weekDate.getDate();
      const year = weekDate.getFullYear().toString().slice(-2);
      const weekString = `${month}/${day}/${year}`;
      
      // Calculate which stage this would have been
      const stageIndex = Math.max(0, currentIndex - i);
      const stage = stages[stageIndex] || 'Prospecting';
      
      history.push({
        week: weekString,
        stage: stage
      });
    }
    
    return history;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel} data-testid="button-cancel-deal">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Location Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" {...field} data-testid="input-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} data-testid="input-city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} data-testid="input-state" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="USA" {...field} data-testid="input-country" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Deal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dealNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-deal-number" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rsf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RSF</FormLabel>
                    <FormControl>
                      <Input placeholder="10,000" {...field} data-testid="input-rsf" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* People Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="broker"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Broker</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} data-testid="input-broker" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bdd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BDD</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} data-testid="input-bdd" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="Property Owner LLC" {...field} data-testid="input-owner" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Deal Specifics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      // Auto-generate weekly history when status changes
                      const newHistory = generateWeeklyHistory(value as DealStage);
                      form.setValue('weeklyHistory', newHistory);
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEAL_STAGES.map((stage) => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-brand">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sike">Sike</SelectItem>
                        <SelectItem value="Mytherous">Mytherous</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ncoExisting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NCO / Existing</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-nco-existing">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NCO">NCO</SelectItem>
                        <SelectItem value="Existing">Existing</SelectItem>
                        <SelectItem value="Takeover">Takeover</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dealType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-deal-type">
                          <SelectValue placeholder="Select deal type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Direct">Direct</SelectItem>
                        <SelectItem value="Sublease">Sublease</SelectItem>
                        <SelectItem value="Coworking">Coworking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || isLoading}
                data-testid="button-submit"
              >
                {isSubmitting ? 'Saving...' : submitLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}