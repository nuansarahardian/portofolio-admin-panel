import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface AboutData {
  _id: string;
  self_desc: string;
  location: string;
  education: string;
  experience_desc: string;
}

const About: React.FC = () => {
  const [data, setData] = useState<AboutData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Mengambil URL dari variabel lingkungan
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const response = await axios.get<AboutData[]>(`${apiUrl}/abouts`);
      console.log("Response data:", response.data);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
  const handleDelete = async (_id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${apiUrl}/abouts/${_id}`);
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      } catch (err) {
        console.error('Error deleting data:', err);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="About" />
      <Link
        to="/aboutcreate"
        className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-white hover:bg-opacity-90"
      >
        Create About
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
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Self Description
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Location
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Education
                    </th>
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Experience
                    </th>
                    <th className="py-4 px-4 font-medium text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item._id}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {item.self_desc}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        {item.location}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        {item.education}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        {item.experience_desc}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link
                          to={`/about_edit/${item._id}`}
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
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
