import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const apiUrl = import.meta.env.VITE_API_URL;

interface CertificateData {
  image: File | null;
  title: string;
  year: string;
  company: string;
  category: string;
  existingImage: string;
}

const CertificateUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const [formData, setFormData] = useState<CertificateData>({
    image: null,
    title: '',
    year: '',
    company: '',
    category: '',
    existingImage: '',
  });

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`${apiUrl}/certificates/${_id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          year: data.year,
          company: data.company,
          category: data.category,
          existingImage: data.image,
          image: null,
        });
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    };

    if (_id) fetchCertificate();
  }, [_id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.image) {
      data.append('image', formData.image);
    }
    data.append('title', formData.title);
    data.append('year', formData.year);
    data.append('company', formData.company);
    data.append('category', formData.category);

    try {
      await axios.put(`${apiUrl}/certificates/${_id}`, data);
      alert('Data berhasil diperbarui!');
      navigate('/certificate');
    } catch (error) {
      console.error('Error updating certificate:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update Certificate" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Certificate
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6.5">
              {formData.existingImage && (
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Current Image
                  </label>
                  <img
                    src={`${apiUrl}/${formData.existingImage}`}
                    alt="Current"
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  New Image (Optional)
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full rounded"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Company
                </label>
                <textarea
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full rounded"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <textarea
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded"
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

export default CertificateUpdate;
