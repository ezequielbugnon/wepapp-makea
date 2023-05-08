import ClipLoader from "react-spinners/ClipLoader";
import styles from './page.module.css';


const Spinner = () => {

  return (
    <div className={styles.container}>

        <ClipLoader color="#003893" size={150} />
    </div>
  );
}

export default Spinner;