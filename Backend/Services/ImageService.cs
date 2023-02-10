namespace Backend.Services;

public interface IImageService
{
    Task<string?> SaveImage(IFormFile image);
    void DeleteImage(string imageName);
}

public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _environment;

    public ImageService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<string?> SaveImage(IFormFile image)
    {
        string extension = Path.GetExtension(image.FileName);
        string fileName = Guid.NewGuid().ToString();
        string imagePath = Path.Combine(_environment.WebRootPath, fileName + extension);

        using (var stream = File.Create(imagePath))
        {
            await image.CopyToAsync(stream);
            return fileName + extension;
        }
    }

    public void DeleteImage(string imageName)
    {
        try
        {
            File.Delete(Path.Combine(_environment.WebRootPath, imageName));
        }
        catch (Exception) { }
    }
}