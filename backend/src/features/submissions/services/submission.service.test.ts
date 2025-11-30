import { createSubmissionService } from './submission.service';
import { NotFoundError } from '@/shared/errors/AppError';

describe('SubmissionService', () => {
    let mockRepository: any;
    let mockLogger: any;
    let service: ReturnType<typeof createSubmissionService>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
        };
        mockLogger = {
            info: jest.fn(),
            error: jest.fn(),
        };
        service = createSubmissionService(mockRepository, mockLogger);
    });

    describe('createSubmission', () => {
        it('should create a submission successfully', async () => {
            const mockData = { data: { name: 'John' } };
            const expectedSubmission = { _id: '123', ...mockData };
            mockRepository.create.mockResolvedValue(expectedSubmission);

            const result = await service.createSubmission(mockData);

            expect(mockRepository.create).toHaveBeenCalledWith({
                formId: 'default-form-id',
                data: mockData.data,
            });
            expect(result).toEqual(expectedSubmission);
        });
    });

    describe('getSubmissions', () => {
        it('should return paginated submissions', async () => {
            const mockQuery = { page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'desc' } as const;
            const expectedResult = {
                submissions: [],
                total: 0,
                page: 1,
                totalPages: 0,
            };
            mockRepository.findAll.mockResolvedValue(expectedResult);

            const result = await service.getSubmissions(mockQuery);

            expect(mockRepository.findAll).toHaveBeenCalledWith(mockQuery);
            expect(result).toEqual(expectedResult);
        });
    });

    describe('getSubmissionById', () => {
        it('should return submission if found', async () => {
            const expectedSubmission = { _id: '123' };
            mockRepository.findById.mockResolvedValue(expectedSubmission);

            const result = await service.getSubmissionById('123');

            expect(mockRepository.findById).toHaveBeenCalledWith('123');
            expect(result).toEqual(expectedSubmission);
        });

        it('should throw NotFoundError if not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(service.getSubmissionById('123'))
                .rejects
                .toThrow('Submission not found');
        });
    });
});
