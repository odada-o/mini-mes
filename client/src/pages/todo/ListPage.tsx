import {useSearchParams} from "react-router-dom";


const ListPage = () => {

    const [queryParams] = useSearchParams()

    const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1;
    const size = queryParams.get('limit') ? Number(queryParams.get('size')) : 10;

    return (
        <div>
            ListPage {page} {size}
        </div>
    );
};

export default ListPage;
