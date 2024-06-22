import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";
export default async function Index() {

  const user = await currentUser()

  if (user) {

    const supabase = createClient();
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('userId', user.id)
      .single();

    if (!data) {
      const { error } = await supabase.from("user").insert({
        credit: 0,
        userId: user.id
      });
      if (error) {
        throw new Error("Error adding user");
      }
    }
  }



  return (
    <main className="flex flex-col w-full min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">QuizGPT</h1>
          <p className="mt-2 text-gray-600">Generate quizzes from PDF files or inputs to help students prepare for exams.</p>
        </div>
      </header>

      <div className="flex-grow">
        <section className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
            <p className="mt-4 text-gray-600">Upload a PDF or enter text to generate quiz sets instantly.</p>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-around items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3 flex flex-col items-center h-40">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">Upload PDF</h3>
              <p className="mt-2 text-gray-600">Easily upload your study material in PDF format.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3 flex flex-col items-center h-40">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">Generate Quizzes</h3>
              <p className="mt-2 text-gray-600">Automatically create quiz sets from the provided content.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 m-4 w-full md:w-1/3 flex flex-col items-center h-40">
              <h3 className="text-xl font-semibold text-gray-800 mt-4">Prepare for Exams</h3>
              <p className="mt-2 text-gray-600">Use the generated quizzes to study and prepare effectively.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold">Get Started with QuizGPT</h2>
          <p className="mt-4 text-indigo-200">Sign up now to start generating quizzes and ace your exams!</p>
          <button className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md shadow hover:bg-indigo-100">Sign Up</button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 QuizGPT. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
