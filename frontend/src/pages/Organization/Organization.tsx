import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const apiUrl = import.meta.env.VITE_API_URL;

interface Organization {
  _id: string;
  role: string;
  dateStart: string;
  dateEnd: string;
  company: string;
  desc: string[];
  logo: string;
}

const Organization = () => {
  const [data, setData] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Organization[]>(
          `${apiUrl}/organizations`,
        );
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
    if (
      window.confirm(
        'Are you sure you want to delete this Organization experience?',
      )
    ) {
      try {
        await axios.delete(`${apiUrl}/organizations/${_id}`);
        setData((prevData) => prevData.filter((item) => item._id !== _id));
      } catch (err) {
        console.error('Error deleting data:', err);
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Organization Experience" />
      <Link
        to="/organization_create"
        className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-white hover:bg-opacity-90"
      >
        Add Organization Experience
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
                      Logo
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Role
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Company
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Start Date
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      End Date
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Description
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
                          src={`${apiUrl}/${item.logo}`}
                          alt={item.company}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border-b py-5 px-4">{item.role}</td>
                      <td className="border-b py-5 px-4">{item.company}</td>
                      <td className="border-b py-5 px-4">
                        {new Date(item.dateStart).toLocaleDateString()}
                      </td>
                      <td className="border-b py-5 px-4">
                        {new Date(item.dateEnd).toLocaleDateString()}
                      </td>
                      <td className="border-b py-5 px-4">
                        <ul className="list-decimal list-item">
                          {item.desc.map((descItem, index) => (
                            <li key={index}>{descItem}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link
                          to={`/organization_update/${item._id}`}
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
                  No organization experience available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Organization;
