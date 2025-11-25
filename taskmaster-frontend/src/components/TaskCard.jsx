export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const priorityColors = {
    low: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300',
    medium: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300',
    high: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
  };

  const priorityIcons = {
    low: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    medium: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    ),
    high: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-[1.03] hover:border-blue-200 animate-slideIn relative overflow-hidden">
      {/* Decorative gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        task.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600' :
        task.priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
        'bg-gradient-to-r from-green-500 to-green-600'
      }`}></div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 flex-1 pr-3 group-hover:text-blue-600 transition-colors">{task.title}</h3>
        <span className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 ${priorityColors[task.priority]} shadow-sm transform group-hover:scale-110 transition-transform`}>
          {priorityIcons[task.priority]}
          {task.priority.toUpperCase()}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{task.description}</p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => onToggle(task)}
            className="mr-2 w-5 h-5 accent-green-600 cursor-pointer"
          />
          <span className={`font-medium transition-all ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-700 group-hover:text-green-600'}`}>
            {task.status === 'completed' ? 'Completed' : 'Todo'}
          </span>
        </label>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onDelete(task)}
            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
