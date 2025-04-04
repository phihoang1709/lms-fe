import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen bg-custom-bg bg-cover bg-center">
      <Outlet/>
    </div>
  );
}

export default PageLayout