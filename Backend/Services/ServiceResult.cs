namespace Backend.Services;

public enum ServiceStatusCode
{
    Success,
    NotFound,
    FieldsMissing,
    AlreadyExists,
    Other,
}

public class ServiceResult<T>
{
    public T? Result { get; set; }
    public ServiceStatusCode StatusCode { get; set; }
    public string? ErrorMessage { get; set; }
}