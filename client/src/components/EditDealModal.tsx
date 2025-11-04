import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import DealForm from './DealForm';
import { CommentThread } from './CommentThread';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { DealWithHistory } from '@/types/deal';

interface EditDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: DealWithHistory;
}

export default function EditDealModal({ isOpen, onClose, deal }: EditDealModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateDealMutation = useMutation({
    mutationFn: async (dealData: any) => {
      return await apiRequest('PATCH', `/api/deals/${deal.id}`, dealData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/deals'] });
      toast({
        title: "Deal updated successfully",
        description: "The deal has been updated.",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error updating deal",
        description: error.message || "Failed to update the deal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: any) => {
    await updateDealMutation.mutateAsync(data);
  };

  // Convert deal data to form format
  const initialData = {
    address: deal.address,
    city: deal.city,
    state: deal.state,
    country: deal.country,
    broker: deal.broker,
    bdd: deal.bdd,
    dealNumber: deal.dealNumber,
    status: deal.status,
    ncoExisting: deal.ncoExisting,
    notes: deal.notes,
    rsf: deal.rsf,
    owner: deal.owner,
    weeklyHistory: deal.weeklyHistory,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Deal Form */}
          <div className="space-y-4">
            <DealForm
              title={`Edit Deal - ${deal.address}`}
              submitLabel="Update Deal"
              initialData={initialData}
              onSubmit={handleSubmit}
              onCancel={onClose}
              isLoading={updateDealMutation.isPending}
            />
          </div>
          
          {/* Comment Thread */}
          <div className="space-y-4">
            <CommentThread dealId={deal.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}