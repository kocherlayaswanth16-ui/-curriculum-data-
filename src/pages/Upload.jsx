function Upload() {
  return (
    <section className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/10">
        <h2 className="text-3xl font-semibold text-white">Upload Syllabus for Analysis</h2>
        <p className="mt-3 text-slate-300">Drop your syllabus document and let the system identify missing skills and outdated topics.</p>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border-dashed border border-slate-700 bg-slate-950/70 p-12 text-center text-slate-400">
            <p className="text-lg font-medium text-slate-100">Drag and drop PDF / DOCX or click to browse</p>
            <p className="mt-3 text-sm">The frontend is ready to connect with file upload backend services.</p>
          </div>
          <label className="block rounded-3xl border border-slate-800 bg-slate-900/90 p-5">
            <span className="mb-3 block text-sm font-medium text-slate-300">Select department</span>
            <select className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-sky-500">
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Business Management</option>
            </select>
          </label>
          <button className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Upload and Analyze
          </button>
        </div>
      </div>
    </section>
  );
}

export default Upload;
