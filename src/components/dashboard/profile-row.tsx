interface ProfileRowProps {
  label: string;
  value: string;
}

export default function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-base">{value || '-'}</p>
    </div>
  );
}