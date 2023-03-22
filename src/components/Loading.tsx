import { loading } from '../assets';

const Loading = ({ title }: { title?: string }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img src={loading} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-black mt-2">{title || 'Loading...'}</h1>
  </div>
);

export default Loading;
