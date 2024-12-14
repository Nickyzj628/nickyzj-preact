type Props = {
  name: string;
  accept?: string;
  placeholder?: string;
  className?: string;
  onChange: (formData: FormData) => void;
};

const Upload = ({ name, accept, placeholder, className, onChange }: Props) => {
  return (
    <>
      <input
        hidden
        type="file"
        name={name}
        accept={accept || "*"}
        onChange={(e: any) => {
          const formData = new FormData()
          const [file] = e.target.files
          formData.append(name, file)
          onChange(formData)
        }}
      />
      <button onClick={(e: any) => e.target.previousSibling.click()} className={className}>
        {placeholder || "上传文件"}
      </button>
    </>
  )
};

export default Upload;