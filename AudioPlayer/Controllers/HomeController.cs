using AudioPlayer.EntityModel;
using AudioPlayer.Models.ViewModel;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.tool.xml;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebGrease;
using Xceed.Document.NET;
using Xceed.Words.NET;
using Paragraph = iTextSharp.text.Paragraph;
namespace AudioPlayer.Controllers
{
    public class HomeController : Controller
    {
        AudioTestDBEntities db = new AudioTestDBEntities();

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult UploadAudio(HttpPostedFileBase fileupload, string fileduration)
        {
            Audio audio = new Audio();
            TimeSpan duration = TimeSpan.Parse(fileduration);

            if (fileupload != null)
            {
                string filepath = "/Content/Audiofiles/";
                string fileName = Path.GetFileNameWithoutExtension(fileupload.FileName);
                string filenamewithextension = fileName + ".shd";
                string fullname = Path.GetFileName(fileupload.FileName);
                string filetype = Path.GetFileName(fileupload.ContentType);
                int filesize = fileupload.ContentLength;

                try
                {
                    audio.Filename = filenamewithextension;
                    audio.FileSize = filesize;
                    audio.Duration = duration;
                    audio.Title = fullname;
                    audio.FileType = filetype;
                    db.Audios.Add(audio);
                    db.SaveChanges();
                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            Trace.TraceInformation("Property: {0} Error: {1}",
                                                    validationError.PropertyName,
                                                    validationError.ErrorMessage);
                        }
                    }
                }

                if (audio.ID > 0)
                {
                    //unique card no
                    string UniquecardId = "SN" + string.Format("{0:D9}", audio.ID);
                    //end -unique card no

                    fileupload.SaveAs(Server.MapPath(filepath + fullname));
                    string fullpath = filepath + fullname;
                    var uploadAudio = db.Audios.Where(x => x.ID == audio.ID).FirstOrDefault();


                    if (uploadAudio.FilePath == fullpath)
                    {

                        db.Entry(uploadAudio).State = EntityState.Deleted;
                        db.SaveChanges();
                    }
                    //var base64EncodedBytesPassword = System.Convert.FromBase64String(fullpath);
                    //string BinaryPath = System.Text.Encoding.UTF8.GetString(base64EncodedBytesPassword);
                    //uploadAudio.FilePath = BinaryPath;
                    audio.UID = UniquecardId;
                    uploadAudio.FilePath = fullpath;
                    db.SaveChanges();
                }

            }
            return RedirectToAction("Home");
        }

        public ActionResult Home()
        {
            var model = db.Audios.AsEnumerable();
            return View(model);
        }

        #region Playlist

        // Home/Playlist
        public ActionResult Playlist()
        {
            var model = db.Playlists.AsEnumerable();
            return View(model);
        }

        // playlist dropdown
        public ActionResult SelectPlaylist()
        {
            var model = db.Playlists.AsEnumerable(); 
            //List<String> playlist = new List<string>();
            //foreach(var item in model)
            //{
            //    playlist.Add(item.Title);
            //}
            //return Json(playlist, JsonRequestBehavior.AllowGet);
            return View("_PartialPlaylist", model);

        }
        // Create/Playlist

        [HttpPost]
        public JsonResult AddPlayList(string listname, string NewSongId, string playlistname)
        {
            dynamic showMessageString = string.Empty;
            int songid = 0;
            if (!string.IsNullOrEmpty(NewSongId))
            {
                 songid = Convert.ToInt32(NewSongId);

            }
            try
            {
                if (!string.IsNullOrEmpty(listname))
                {

                    Playlist AddList = new Playlist();
                    AddList.Title = listname;
                    db.Playlists.Add(AddList);
                    db.SaveChanges();

                    string UniqueListId = "P" + string.Format("{0:D10}", AddList.ID);

                    if (AddList.ID > 0)
                    {
                        AddList.UID = UniqueListId;
                        db.SaveChanges();
                    }
                    var getsong = db.Audios.FirstOrDefault(x => x.ID == songid);

                    // adding song to newly created playlist 
                    try
                    {
                        Playlist1 addsong = new Playlist1();
                        addsong.Name = AddList.Title;
                        addsong.UID = getsong.UID;
                        addsong.Title = getsong.Filename;
                        addsong.Length = getsong.FileSize;
                        db.Playlists1.Add(addsong);
                        db.SaveChanges();

                        //sortorder to display song

                        if (addsong.ID > 0)
                        {
                            addsong.OrderSort = addsong.ID;
                            db.SaveChanges();
                        }
                    }
                    catch (DbEntityValidationException dbEx)
                    {
                        foreach (var validationErrors in dbEx.EntityValidationErrors)
                        {
                            foreach (var validationError in validationErrors.ValidationErrors)
                            {
                                Trace.TraceInformation("Property: {0} Error: {1}",
                                                        validationError.PropertyName,
                                                        validationError.ErrorMessage);
                            }
                        }
                    }

                }
                else if (!string.IsNullOrEmpty(playlistname))
                {
                    var Playlistsong = db.Audios.FirstOrDefault(x => x.ID == songid);
                    var playlistid = Convert.ToInt32(playlistname);
                    var playlistdetail = db.Playlists.FirstOrDefault(x => x.ID == playlistid);

                    // adding song to newly created playlist 
                    try
                    {
                        Playlist1 addsong1 = new Playlist1();
                        addsong1.Name = playlistname;
                        addsong1.PID = playlistdetail.UID;
                        addsong1.UID = Playlistsong.UID;
                        addsong1.Title = Playlistsong.Filename;
                        addsong1.Length = Playlistsong.FileSize;
                        db.Playlists1.Add(addsong1);
                        db.SaveChanges();

                        //sortorder to display song

                        if (addsong1.ID > 0)
                        {
                            addsong1.OrderSort = addsong1.ID;
                            db.SaveChanges();
                        }
                    }
                    catch (DbEntityValidationException dbEx)
                    {
                        foreach (var validationErrors in dbEx.EntityValidationErrors)
                        {
                            foreach (var validationError in validationErrors.ValidationErrors)
                            {
                                Trace.TraceInformation("Property: {0} Error: {1}",
                                                        validationError.PropertyName,
                                                        validationError.ErrorMessage);
                            }
                        }
                    }
                }


                showMessageString = new
                {
                    param1 = 200,
                    param2 = "Play list created successfully."
                };
                return Json(showMessageString, JsonRequestBehavior.AllowGet);
            }

            catch (DbEntityValidationException dbEx)
            {
                foreach (var validationErrors in dbEx.EntityValidationErrors)
                {
                    foreach (var validationError in validationErrors.ValidationErrors)
                    {
                        Trace.TraceInformation("Property: {0} Error: {1}",
                                                validationError.PropertyName,
                                                validationError.ErrorMessage);
                    }
                }
                showMessageString = new
                {
                    param1 = 404,
                    param2 = "Error occurred while creating list"
                };
                return Json(showMessageString, JsonRequestBehavior.AllowGet);
            }
        }


        // Home/Showplaylist/id

        [HttpGet]
        public ActionResult ShowPlaylist(string id)
        {
            var listid = Convert.ToInt32(id);

            

            var query = db.Playlists.FirstOrDefault(x => x.ID == listid);

            var playlist = (from list in db.Playlists1
                            join listsong in db.Audios on list.UID equals listsong.UID into ps
                            from p in ps.DefaultIfEmpty()
                            where list.PID == query.UID  
                            select new AudiolistModel
                            {
                                CartId   = list.UID,
                            PlaylistName = list.Name,
                                SongName = list.Title,
                               SortOrder = list.OrderSort,
                                FilePath = p.FilePath,
                                FileSize = p.FileSize,
                                SongId   = p.ID,
                                Filetype = p.FileType,
                                Command  = list.Command,
                           Cmd_Parameter = list.Cmd_Parameter
                            }
                        ).AsQueryable();

            return View("_PartialSonglist", playlist);

        }

        [HttpGet]

        public ActionResult GetPlaylist()
        {
            var playlist = db.Playlists.AsQueryable();
            return View("_PartialPlaylist", playlist);
        }


        #endregion

        public ActionResult Test()
        {
            return View();
        }


        #region LogImport
        public JsonResult PutApilog(string Title, string EventTime, string playlistname)
        {
            dynamic showMessageString = string.Empty;
            DateTime Eventtime = DateTime.Parse(EventTime);

            if (!string.IsNullOrEmpty(Title))
            {
                var GetAudiodetail = db.Audios.FirstOrDefault(x => x.Title == Title);

                // adding song to newly created playlist 
                try
                {

                    Log AddLog = new Log
                    {
                        Title = GetAudiodetail.Title,
                        EventTime = Eventtime,
                        CartId = GetAudiodetail.UID,
                        Duration = GetAudiodetail.Duration,
                        Playlistname = playlistname
                    };
                    db.Logs.Add(AddLog);
                    db.SaveChanges();
                }
                catch (DbEntityValidationException dbEx)
                {
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            Trace.TraceInformation("Property: {0} Error: {1}",
                                                    validationError.PropertyName,
                                                    validationError.ErrorMessage);
                        }
                    }
                }
            }


            showMessageString = new
            {
                param1 = 200,
                param2 = "Play list created successfully."
            };
            return Json(showMessageString, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetdrpPlaylist()
        {
            return Json(db.Playlists.Select(x => new
            {
                ID = x.ID,
                Title = x.Title
            }).ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult Loghistory()
        {
          
            var SearchResult = TempData["SearchResult"];
            var LogResult = TempData["LogResult"];
            var loglist = db.Logs.AsEnumerable().OrderByDescending(x=>x.ID);

            if (SearchResult != null)
            {
                return View(SearchResult);
            }
            else if (LogResult != null)
            {
                return View(LogResult);
            }
            else
            {
                return View(loglist);
            }

        }

        [HttpPost]
        public ActionResult GetSearchLog(string Fromdate, string Todate, string playlistname)
        {

            DateTime StartTime = DateTime.ParseExact(Fromdate, "M/d/yyyy h:mm tt", CultureInfo.InvariantCulture);
            DateTime EndTime = DateTime.ParseExact(Todate, "M/d/yyyy h:mm tt", CultureInfo.InvariantCulture);

            var result = db.Logs.Where(x => x.EventTime >= StartTime && x.EventTime <= EndTime).ToList();

            if (!String.IsNullOrEmpty(playlistname))
            {
                var searchresult = result.Where(x => x.Playlistname == playlistname);
                if (searchresult.Count() > 0)
                {
                    TempData["SearchResult"] = searchresult;
                    return RedirectToAction("Loghistory", "Home");

                }

            }

            TempData["LogResult"] = result;
            return RedirectToAction("Loghistory", "Home");
        }



        #endregion




        #region ExportLogs

        // working
        public ActionResult Export(List<Log> logdata)
        {
            if (logdata == null)
            {
                logdata = new List<Log>();
            }
            StringBuilder sb = new StringBuilder();


            //Loop and insert records.
            foreach (Log s in logdata)
            {
                sb.AppendLine(s.EventTime + ", " + s.CartId + ", " + s.Title + ", " + s.Duration + ", " + s.Playlistname);
            }

            var string_with_your_data = sb.ToString();
            string jsondata1 = JsonConvert.SerializeObject(logdata);
            string jsondata = JsonConvert.SerializeObject(string_with_your_data);
            TextWriter txt = null;
            string txtFile = "E:\\Amruta Technologies\\Audio Player\\AudioPlayer\\AudioPlayer\\AudioPlayer\\Content\\assets\\Logfiles\\MyNewFile" + ".text";

            if (System.IO.File.Exists(txtFile))
            {
                txt = new StreamWriter(txtFile);
            }
            else
            {
                txt = new StreamWriter(txtFile, append: true);
            }
            txt.WriteLine(jsondata);
            txt.Close();
            string jsonProductList = new JavaScriptSerializer().Serialize(jsondata);


            return null;
        }




        //Working
        [HttpPost]
        public FileResult ExportList(List<Log> logdata)
        {
            if (logdata == null)
            {
                logdata = new List<Log>();
            }

            StringBuilder sb = new StringBuilder();

            sb.Append("EventTime");
            sb.Append("  ");
            sb.Append("CartId");
            sb.Append("  ");
            sb.Append("Title");
            sb.Append("  ");
            sb.Append("Duration");
            sb.Append("  ");
            sb.Append("Playlistname");
            sb.AppendLine();
            //Loop and insert records.
            foreach (Log s in logdata)
            {
                sb.Append(s.EventTime);
                sb.Append("  ");
                sb.Append(s.CartId);
                sb.Append("  ");
                sb.Append(s.Title);
                sb.Append("  ");
                sb.Append(s.Duration);
                sb.Append("  ");
                sb.Append(s.Playlistname);
                sb.AppendLine();
            }

            var csvString = sb.ToString();

            var fileName = "logdata " + DateTime.Now.ToString() + ".csv";
            //byte[] buffer = System.Text.Encoding.UTF8.GetBytes(csvString);
            //return File(buffer, "text/csv", fileName);
            //var fileName = "logdata " + DateTime.Now.ToString() + ".txt";
            return File(new System.Text.UTF8Encoding().GetBytes(csvString), "text/csv", fileName);
        }


        //[HttpGet]
        //public FileContentResult Export()
        //{
        //    var csvString = GenerateCSVString();
        //    var fileName = "PersonData " + DateTime.Now.ToString() + ".csv";
        //    return File(new System.Text.UTF8Encoding().GetBytes(csvString), "text/csv", fileName);
        //}
        //private string GenerateCSVString()
        //{
        //    var logsdata = GetPersonInfo();
        //    StringBuilder sb = new StringBuilder();
        //    sb.Append("Title");
        //    sb.Append("  ");
        //    sb.Append("Title");
        //    sb.AppendLine();
        //    foreach (var person in logsdata)
        //    {
        //        sb.Append(person.Title);
        //        sb.Append(" ");
        //        sb.Append(person.CartId);
        //        sb.AppendLine();
        //    }
        //    return sb.ToString();
        //}
        //private List<Log> GetPersonInfo()
        //{
        //    List<Log> Logs = new List<Log>();
        //    Log p1 = new Log() { Title = "Alex", CartId = "SN000001004" };
        //    Log p2 = new Log() { Title = "Jhon", CartId = "SN000001004" };
        //    Logs.Add(p1);
        //    Logs.Add(p2);
        //    return Logs;
        //}

        #endregion

        #region  ImportLogs

        [HttpPost]
        public ActionResult ImportLogs(HttpPostedFileBase postedFile)
        {
            List<Log> ImportLogs = new List<Log>();
            string filePath = string.Empty;
            if (postedFile != null)
            {
                string path = Server.MapPath("~/Content/Logfiles/ImportLogs/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = path + Path.GetFileName(postedFile.FileName);
                string extension = Path.GetExtension(postedFile.FileName);
                postedFile.SaveAs(filePath);

                //Read the contents of CSV file.
                string csvData = System.IO.File.ReadAllText(filePath);

                //Execute a loop over the rows.
                foreach (string row in csvData.Split('\n'))
                {
                    if (!string.IsNullOrEmpty(row))
                    {
                        ImportLogs.Add(new Log
                        {
                            //EventTime = Convert.ToDateTime(row.Split(',')[0]),
                            CartId = row.Split(',')[1],
                            Title = row.Split(',')[2],
                            //Duration = TimeSpan.Parse(row.Split(',')[3].ToString()),
                            Playlistname = row.Split(',')[4],
                        });
                    }
                }


                Playlist playlist = new Playlist();
                playlist.Title = "Log" + "" + DateTime.Now.ToString("dd/MM/yyyy hh:mm tt");

                db.Playlists.Add(playlist);
                db.SaveChanges();
                string UniqueListId = "P" + string.Format("{0:D10}", playlist.ID);

                if (playlist.ID > 0)
                {
                    playlist.UID = UniqueListId;
                    db.SaveChanges();
                }

                Playlist1 playlist1 = new Playlist1();
                foreach (var item in ImportLogs)
                {
                    var getaudiodetail = db.Audios.FirstOrDefault(x => x.UID == item.CartId);

                    playlist1.Name = playlist.Title;
                    playlist1.Title = item.Title;
                    playlist1.UID = getaudiodetail.UID;
                    playlist1.Length = getaudiodetail.FileSize;
                    playlist1.PID = playlist.UID;
                    db.Playlists1.Add(playlist1);
                    db.SaveChanges();

                    //sortorder to display song

                    if (playlist1.ID > 0)
                    {
                        playlist1.OrderSort = playlist1.ID;
                        db.SaveChanges();
                    }
                }
            }

            return RedirectToAction("Loghistory");
        }

        #endregion

        #region commands
        [HttpPost]
        public ActionResult AddCommand(string Commandname, string ddlplaylist , string Commandtime)
        {

            var listname = db.Playlists.Where(x => x.Title == ddlplaylist).FirstOrDefault();
            Playlist1 addcommand = new Playlist1();
            addcommand.Command = Commandname;
            addcommand.Name = ddlplaylist;
            addcommand.Cmd_Parameter =TimeSpan.Parse(Commandtime);
            db.Playlists1.Add(addcommand);
            db.SaveChanges();

            db.SaveChanges();

            //string UniqueListId = "P" + string.Format("{0:D10}", addcommand.ID);

            if (addcommand.ID > 0)
            {
                addcommand.PID = listname.UID;
                db.SaveChanges();
            }

            return RedirectToAction("Home");
        }

        #endregion
    }
}