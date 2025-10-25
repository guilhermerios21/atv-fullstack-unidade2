import mongoose, { Document, Schema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'userId é obrigatório'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
      minlength: [3, 'Título deve ter no mínimo 3 caracteres'],
      maxlength: [200, 'Título deve ter no máximo 200 caracteres']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Descrição deve ter no máximo 1000 caracteres']
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
      required: true
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
      required: true
    },
    dueDate: {
      type: Date
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Índice composto para otimizar queries por usuário
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ITask>('Task', taskSchema);
