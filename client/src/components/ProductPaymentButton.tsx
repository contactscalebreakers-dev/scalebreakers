import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface Product {
  id: string;
  name: string;
  price: string;
  stock?: string | null;
}

interface ProductPaymentButtonProps {
  product: Product;
}

export default function ProductPaymentButton({ product }: ProductPaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const createCheckout = trpc.payments.createProductCheckout.useMutation();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const result = await createCheckout.mutateAsync({
        productId: product.id,
        quantity: 1,
      });

      if (result.url) {
        toast.success("Redirecting to checkout...");
        window.open(result.url, "_blank");
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isOutOfStock = !product.stock || parseInt(product.stock) === 0;

  return (
    <Button
      onClick={handlePayment}
      disabled={isOutOfStock || isLoading}
      className="w-full"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
      {isOutOfStock ? "Out of Stock" : "Buy Now"}
    </Button>
  );
}
