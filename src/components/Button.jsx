const Button = ({ children, onClick, disabled }) => (
  <button 
    onClick={onClick} 
    disabled={disabled}
    style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
  >
    {children}
  </button>
);