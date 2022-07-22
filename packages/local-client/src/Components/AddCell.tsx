import { useActions } from "../Hooks/useActions";
import "./AddCell.css";

interface AddCellProps {
  previousCellId: string | null;
  forceVisable?: boolean;
}
const AddCell: React.FC<AddCellProps> = ({
  previousCellId,
  forceVisable = false,
}) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisable && "force-visable"}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
          <i className="fas fa-code"> </i>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "markdown")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span> Markdown</span>
          <i className="fas fa-markdown"></i>
        </button>
      </div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
