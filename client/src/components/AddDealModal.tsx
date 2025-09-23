import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import DealForm from './DealForm';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddDealModal({ isOpen, onClose }: AddDealModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addDealMutation = useMutation({
    mutationFn: async (dealData: any) => {
      return await apiRequest('POST', '/api/deals', dealData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/deals'] });
      toast({
        title: "Deal added successfully",
        description: "The new deal has been added to your dashboard.",
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error adding deal",
        description: error.message || "Failed to add the deal. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (data: any) => {
    await addDealMutation.mutateAsync(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DealForm
          title="Add New Deal"
          submitLabel="Add Deal"
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={addDealMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}