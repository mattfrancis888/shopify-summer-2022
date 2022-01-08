import BeatLoader from "react-spinners/BeatLoader";
const Loading = (): JSX.Element => {
    return (
        <div className="loading--center">
            <BeatLoader color={"white"} loading={true} />
        </div>
    );
};
export default Loading;
