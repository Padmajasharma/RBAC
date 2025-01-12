import axiosInstance from "../../../config/AxiosSetup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { toast } from "react-toastify";

export default function ArticleCreateForm() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const navigate = useNavigate();

  const createArticle = () => {
    axiosInstance
      .post("/api/articles", {
        title: articleTitle,
        content: articleContent,
      })
      .then((response) => {
        console.log(response);
        toast.success("Article created successfully", { autoClose: 2000 });
        navigate("/dashboard/articles");
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Create Article</h1>
      </div>
      <div className="flex max-w-md flex-col gap-4">
        <Label>Title</Label>
        <TextInput
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
        />
        <Label>Content</Label>
        <Textarea
          rows={7}
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
        />
        <Button onClick={createArticle}>Create</Button>
      </div>
    </>
  );
}
