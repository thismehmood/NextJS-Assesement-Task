import Login from "../app/login/index"; // Adjust the import path as per your project structure

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Render the login component */}
      <Login />
    </main>
  );
};

export default Home;
