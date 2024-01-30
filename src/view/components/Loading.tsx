import { Loader } from "./Loader";

interface Props {
  isLoading: boolean;
}
export function Loading({ isLoading }: Props) {
  return (
    <>
      {isLoading && (
        <div className="h-screen flex flex-col gap-2 items-center justify-center bg-slate-900 absolute inset-0 z-10">
          <Loader />
          <span className="">Carregando...</span>
        </div>
      )}
    </>
  );
}
