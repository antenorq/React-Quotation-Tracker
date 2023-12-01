import moment from "moment";
//firebase
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseUploadFile = async (file) => {
  const fileRef = ref(storage, `files/` + moment().format("YYYY-MM-DD_h:m:s") + "_" + file.name);
  const fileUploaded = await uploadBytes(fileRef, file);

  if (fileUploaded.metadata.fullPath) {
    const fileUrl = await getDownloadURL(fileRef);

    return fileUrl;
  }
};

export default FirebaseUploadFile;
