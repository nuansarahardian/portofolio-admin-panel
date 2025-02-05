import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const apiUrl = import.meta.env.VITE_API_URL;

interface WorkData {
  role: string;
  dateStart: string;
  dateEnd: string;
  company: string;
  desc: string;
  logo: string;
  existingLogo: string;
}

const WorkUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const [formData, setFormData] = useState<WorkData>({
    role: '',
    dateStart: '',
    dateEnd: '',
    company: '',
    desc: '',
    logo: '',
    existingLogo: '',
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`${apiUrl}/works/${_id}`);
        const data = response.data;
        setFormData({
          role: data.role,
          dateStart: data.dateStart.slice(0, 10),
          dateEnd: data.dateEnd.slice(0, 10),
          company: data.company,
          desc: data.desc.join(', '),
          logo: '',
          existingLogo: data.logo, // Store the existing logo URL
        });
      } catch (error) {
        console.error('Error fetching work:', error);
      }
    };

    if (_id) fetchWork();
  }, [_id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.logo) {
      data.append('logo', formData.logo);
    }
    data.append('role', formData.role);
    data.append('dateStart', formData.dateStart);
    data.append('dateEnd', formData.dateEnd);
    data.append('company', formData.company);
    data.append('desc', formData.desc);

    try {
      await axios.put(`${apiUrl}/works/${_id}`, data);
      alert('Data berhasil diperbarui!');
      navigate('/work');
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Work Experience" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Work Experience
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6.5">
              {formData.existingLogo && (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Current Logo
                  </label>
                  <img
                    src={`${apiUrl}/${formData.existingLogo}`}
                    alt="Current Logo"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  New Logo (Optional)
                </label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Start Date
                </label>
                <input
                  type="date"
                  name="dateStart"
                  value={formData.dateStart}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  End Date
                </label>
                <input
                  type="date"
                  name="dateEnd"
                  value={formData.dateEnd}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 rounded bg-primary text-gray font-medium hover:bg-opacity-90"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkUpdate;
