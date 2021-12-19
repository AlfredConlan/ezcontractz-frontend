import "./home.css";

function Home() {
  return (
    <div className="background-photo">
      <div className="container text-center">
        <p className="h1 blue-text pt-5">EZContractz - test</p>
        <p className="h3 blue-text mt-5">A no-hassle way to track your homeowner tasks and find contractors to do the work.</p>
        <a href="/tasks" className="btn btn-primary mt-5" role="button">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default Home;
