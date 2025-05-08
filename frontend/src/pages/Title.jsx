const Title = ({ text1, text2 }) => {
  return (
    <>
      <div className="inline-flex gap-2 items-center mb-8">
        <p className="text-gray-500 font-medium">{text1}</p>
        <p className="text-orange-500 font-medium">{text2}</p>
        <p className="w-8 sm:w-12 h-[2px] bg-slate-950"></p>
      </div>
    </>
  );
};
export default Title;
