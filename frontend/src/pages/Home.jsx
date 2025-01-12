import { CustomNav } from "../components/home/Navbar";
import axiosInstance from "../config/AxiosSetup";
import { useEffect, useState } from "react";
import { Card, Spinner } from "flowbite-react";
import { toast } from "react-toastify";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/api/articles/published`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Failed to fetch articles");
      });
  }, []);

  return (
    <>
      <CustomNav />
      <div className="w-full m-auto max-w-[1100px] flex flex-col font-nunito scroll-smooth px-10 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </div>
        ) : (
          articles.map((article, index) => (
            <Card key={index} className="mt-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white max-w-2xl">
                    {article.title}
                  </h5>
                  <h6 className="text-md text-gray-500 dark:text-gray-400">
                    {new Date(article.created_at).toLocaleDateString()}
                  </h6>
                </div>
                <h5>
                  <span className="text-md text-gray-500 dark:text-gray-400">
                    {article.author.name}
                  </span>
                </h5>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {article.content}
              </p>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
