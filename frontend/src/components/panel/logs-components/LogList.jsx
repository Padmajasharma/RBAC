import axiosInstance from "../../../config/AxiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Table, Spinner } from "flowbite-react";
import JsonView from "@uiw/react-json-view";

export default function LogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/api/logs`)
      .then((res) => {
        console.log(res);
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Logs</h1>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Timestap</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Model</Table.HeadCell>
          <Table.HeadCell>Actor</Table.HeadCell>
          <Table.HeadCell>Entity</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {logs.map((log, index) => (
            <Table.Row key={log.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>
                {new Date(log.createdAt).toLocaleString()}
              </Table.Cell>
              <Table.Cell
                className={
                  log.action === "CREATE"
                    ? "text-green-500"
                    : log.action === "UPDATE"
                    ? "text-yellow-500"
                    : log.action === "DELETE"
                    ? "text-red-500"
                    : ""
                }
              >
                {log.action}
              </Table.Cell>
              <Table.Cell>{log.entity}</Table.Cell>
              <Table.Cell>{log.actor.name}</Table.Cell>
              <Table.Cell>
                <JsonView value={log.details} collapsed={true} />
              </Table.Cell>
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
