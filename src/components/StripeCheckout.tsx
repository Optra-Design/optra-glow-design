
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

interface StripeCheckoutProps {
  priceId?: string;
  mode?: 'subscription' | 'payment';
  amount?: number;
  title: string;
  description: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  priceId,
  mode = 'payment',
  amount = 9999,
  title,
  description
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to continue');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode, amount }
      });

      if (error) {
        toast.error('Failed to create checkout session');
        return;
      }

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 glass rounded-3xl">
      <h3 className="text-xl font-bold text-gradient mb-2">{title}</h3>
      <p className="text-foreground/80 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gradient">
          ${mode === 'subscription' ? '99/month' : (amount / 100).toFixed(2)}
        </span>
        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-optra-gradient hover:scale-105 transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <CreditCard className="w-4 h-4 mr-2" />
          )}
          {mode === 'subscription' ? 'Subscribe' : 'Buy Now'}
        </Button>
      </div>
    </div>
  );
};

export default StripeCheckout;
