import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
import { Spinner } from "flowbite-react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hasRole } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    let url = `${apiUrl}/api/articles/my`;

    if (hasRole("admin") || hasRole("editor")) {
      url = `${apiUrl}/api/articles`;
    }

    axiosInstance
      .get(url)
      .then((res) => {
        console.log(res);
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Articles</h1>
        <Button onClick={() => navigate(`/dashboard/articles/add`)}>Add</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {articles.map((article, index) => (
            <Table.Row key={article.id}>
              <Table.Cell>{index+1}</Table.Cell>
              <Link to={`${article._id}`}>
                <Table.Cell>{article.title}</Table.Cell>
              </Link>
              <Table.Cell>
              {new Date(article.created_at).toLocaleString()}
              </Table.Cell>
              <Table.Cell
                className={
                  article.status === "published"
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                {article.status}
              </Table.Cell>
              <Table.Cell>{article.author.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex items-center justify-center p-10">
        {loading && <Spinner size="lg" />}
      </div>
    </>
  );
}
