type Props = { label: string };

export function BenefitsChip({ label }: Props) {
  return (
    <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
      {label}
    </span>
  );
}
