import React from "react"
import ContentLoader from "react-content-loader"

const Loader = (props) => {
    const {isloading, height = 500 } = props;
    return (
        isloading ? 
            <ContentLoader
                className='m-2'
                speed={1}
                width='90%'
                height={height}
                viewBox="0 0 800 500"
                backgroundColor="#d9d9d9"
                foregroundColor="#ededed"
                {...props}
                >
                <rect x="50" y="6" rx="4" ry="4" width="800" height="30" />
                <rect x="8" y="6" rx="4" ry="4" width="35" height="30" />
                <rect x="50" y="55" rx="4" ry="4" width="400" height="30" />
                <rect x="8" y="55" rx="4" ry="4" width="35" height="30" />
                
                <rect x="50" y="134" rx="4" ry="4" width="800" height="30" />
                <rect x="8" y="134" rx="4" ry="4" width="35" height="30" />
                <rect x="50" y="183" rx="4" ry="4" width="400" height="30" />
                <rect x="8" y="183" rx="4" ry="4" width="35" height="30" />


                <rect x="50" y="262" rx="4" ry="4" width="800" height="30" />
                <rect x="8" y="262" rx="4" ry="4" width="35" height="30" />
                <rect x="50" y="311" rx="4" ry="4" width="400" height="30" />
                <rect x="8" y="311" rx="4" ry="4" width="35" height="30" /> 

                <rect x="50" y="390" rx="4" ry="4" width="800" height="30" />
                <rect x="8" y="390" rx="4" ry="4" width="35" height="30" />  
                <rect x="50" y="439" rx="4" ry="4" width="400" height="30" />
                <rect x="8" y="439" rx="4" ry="4" width="35" height="30" />

                <rect x="50" y="518" rx="4" ry="4" width="800" height="30" />
                <rect x="8" y="518" rx="4" ry="4" width="35" height="30" />
                <rect x="50" y="567" rx="4" ry="4" width="400" height="30" />
                <rect x="8" y="567" rx="4" ry="4" width="35" height="30" />            

            </ContentLoader>
        : <span></span>
    );
}

export default Loader