import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const apiUrl = import.meta.env.VITE_API_URL;

interface Project {
  _id: string;
  title: string;
  desc: string;
  tech: string[];
  category: string;
  link: string;
  image: string;
}

const Project = () => {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Project[]>(`${apiUrl}/projects`);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${apiUrl}/projects/${_id}`);
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      } catch (err) {
        console.error('Error deleting data:', err);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Project" />
      <Link
        to="/project_create"
        className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-white hover:bg-opacity-90"
      >
        Create Project
      </Link>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="flex flex-col gap-10 mt-4">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-lg dark:border-strokedark dark:bg-boxdark">
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto border-collapse border">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Image
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Title
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Description
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Tech Stack
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Category
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Link
                    </th>
                    <th className="py-4 px-4 font-medium text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td className="border-b py-5 px-4">
                        <img
                          src={`${apiUrl}/${item.image}`}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </td>
                      <td className="border-b py-5 px-4">{item.title}</td>
                      <td className="border-b py-5 px-4">{item.desc}</td>
                      <td className="border-b py-5 px-4">
                        {item.tech.join(', ')}
                      </td>
                      <td className="border-b py-5 px-4">{item.category}</td>
                      <td className="border-b py-5 px-4">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Project
                        </a>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link
                          to={`/project_update/${item._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-gray-500 ml-4 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length === 0 && (
                <p className="text-center mt-4 text-gray-500">
                  No projects available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
