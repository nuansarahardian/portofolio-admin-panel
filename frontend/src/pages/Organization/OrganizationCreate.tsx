import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
  role: string;
  dateStart: string;
  dateEnd: string;
  company: string;
  desc: string[];
  logo: File | null;
}

const OrganizationCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    role: '',
    dateStart: '',
    dateEnd: '',
    company: '',
    desc: [''],
    logo: null,
  });

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

  const handleDescChange = (index: number, value: string) => {
    const newDesc = [...formData.desc];
    newDesc[index] = value;
    setFormData({ ...formData, desc: newDesc });
  };

  const addDescField = () => {
    setFormData({ ...formData, desc: [...formData.desc, ''] });
  };

  const removeDescField = (index: number) => {
    const newDesc = formData.desc.filter((_, i) => i !== index);
    setFormData({ ...formData, desc: newDesc });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('role', formData.role);
    data.append('dateStart', formData.dateStart);
    data.append('dateEnd', formData.dateEnd);
    data.append('company', formData.company);
    formData.desc.forEach((desc, index) => {
      data.append(`desc[${index}]`, desc);
    });
    if (formData.logo) data.append('logo', formData.logo);

    try {
      await axios.post(`${apiUrl}/organizations`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Organization successfully created!');
      navigate('/organization');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Organization" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Organization
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6.5">
              {/* Role */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter role"
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Date Start */}
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Date End */}
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Company */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {/* Description */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                {formData.desc.map((desc, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleDescChange(index, e.target.value)}
                      placeholder="Enter description"
                      required
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeDescField(index)}
                        className="p-3 bg-red-500 text-white rounded"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDescField}
                  className="p-3 bg-primary text-white rounded"
                >
                  Add Description
                </button>
              </div>

              {/* Logo */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Logo
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary mb-6"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationCreate;
