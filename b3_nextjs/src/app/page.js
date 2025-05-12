import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Product Management System</h1>
      <p>This is a simple product management application built with Next.js.</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Features:</h2>
        <ul>
          <li>View all products</li>
          <li>Add new products</li>
          <li>View product details</li>
        </ul>
      </div>
    </div>
  );
}
