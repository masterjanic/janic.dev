import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const containerVariants = cva("mx-auto px-4 sm:px-6 lg:px-8", {
  variants: {
    variant: {
      default: "max-w-7xl",
      lg: "max-w-8xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export default function Container({
  className,
  variant,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(containerVariants({ variant, className }))} {...props} />
  );
}

export { containerVariants };
