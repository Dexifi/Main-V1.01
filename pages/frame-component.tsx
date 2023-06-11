import type { NextPage } from "next";
import styles from "./frame-component.module.css";
const FrameComponent: NextPage = () => {
  return (
    <div className={styles.readDocsParent}>
      <div className={styles.readDocs}>Read Docs</div>
    </div>
  );
};

export default FrameComponent;
