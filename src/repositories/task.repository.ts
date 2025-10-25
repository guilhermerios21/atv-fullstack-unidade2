import Task, { ITask, TaskStatus, TaskPriority } from '../models/task.model';
import mongoose from 'mongoose';

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  tags?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
}

class TaskRepository {
  async create(taskData: Partial<ITask>): Promise<ITask> {
    const userId = (taskData.userId instanceof mongoose.Types.ObjectId)
      ? taskData.userId
      : new mongoose.Types.ObjectId(taskData.userId as any);
    const task = new Task({ ...taskData, userId });
    return await task.save();
  }

  async findAll(userId: string, filters?: TaskFilters): Promise<ITask[]> {
    const query: any = { userId: new mongoose.Types.ObjectId(userId) };

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.priority) {
      query.priority = filters.priority;
    }

    if (filters?.tags) {
      query.tags = { $in: filters.tags.split(',').map(tag => tag.trim()) };
    }

    if (filters?.dueDateFrom || filters?.dueDateTo) {
      query.dueDate = {};
      if (filters.dueDateFrom) {
        query.dueDate.$gte = filters.dueDateFrom;
      }
      if (filters.dueDateTo) {
        query.dueDate.$lte = filters.dueDateTo;
      }
    }

    return await Task.find(query).sort({ createdAt: -1 });
  }

  async findById(taskId: string, userId: string): Promise<ITask | null> {
    return await Task.findOne({
      _id: taskId,
      userId: new mongoose.Types.ObjectId(userId)
    });
  }

  // Busca por ID sem filtrar por usuário (para distinguir 404 de 403)
  async findByIdAny(taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  }

  async update(taskId: string, userId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId: new mongoose.Types.ObjectId(userId)
      },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async partialUpdate(taskId: string, userId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId: new mongoose.Types.ObjectId(userId)
      },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async delete(taskId: string, userId: string): Promise<ITask | null> {
    return await Task.findOneAndDelete({
      _id: taskId,
      userId: new mongoose.Types.ObjectId(userId)
    });
  }

  async countByUser(userId: string): Promise<number> {
    return await Task.countDocuments({ userId: new mongoose.Types.ObjectId(userId) });
  }

  async countByStatus(userId: string, status: TaskStatus): Promise<number> {
    return await Task.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
      status
    });
  }
}

export default new TaskRepository();
