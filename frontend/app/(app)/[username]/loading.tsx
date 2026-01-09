// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin h-8 w-8 rounded-full border-4 border-gray-300 border-t-transparent" />
      LOADING
    </div>
  );
}
