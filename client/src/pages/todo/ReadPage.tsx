import {useParams} from "react-router-dom";

const ReadPage = () => {
    const {id} = useParams<{id: string}>();
    return (
        <div>
            ReadPage: {id}
        </div>
    );
};

export default ReadPage;
