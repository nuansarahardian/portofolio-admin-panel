import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const AboutUpdate = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // Mengambil ID dari URL
  const [formData, setFormData] = useState({
    self_desc: '',
    location: '',
    education: '',
    experience_desc: '',
  });

  // Fetch data berdasarkan ID saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/abouts/${_id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data About');
        }
        const data = await response.json();
        setFormData(data); // Set data ke state
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (_id) {
      fetchData();
    }
  }, [_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/abouts/${_id}`, {
        method: 'PUT', // Menggunakan PUT untuk update
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Gagal mengupdate data About');
      }

      alert('Data berhasil diperbarui!');
      navigate('/about');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Update About" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Update About Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update About
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                {/* Self Description */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Self Description
                  </label>
                  <input
                    type="text"
                    name="self_desc"
                    value={formData.self_desc}
                    onChange={handleChange}
                    placeholder="Enter your self description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Location */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Education */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="Enter your education"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Experience Description */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Experience Description
                  </label>
                  <textarea
                    name="experience_desc"
                    rows={4}
                    value={formData.experience_desc}
                    onChange={handleChange}
                    placeholder="Enter your experience description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUpdate;
